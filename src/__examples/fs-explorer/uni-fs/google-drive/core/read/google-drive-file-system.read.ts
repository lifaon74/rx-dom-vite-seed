import { Path } from '@lifaon/path';
import { fromAsyncIterable, fromPromiseFactory, fulfilled$$$, IObservable, pipe$$ } from '@lirx/core';
import {
  fileRangeFromSize,
  IFileSystemReadFunction,
  IFileSystemReadFunctionNotifications,
  IFileSystemReadOptions,
  urlToPath,
} from '@uni-fs/core';
import {
  googleDriveDownloadFile,
  googleDriveGetFileSize,
  IGoogleDriveDownloadFileOptions,
} from '../../../../api/google/drive/get-file/google-drive-get-file';
import { GOOGLE_DRIVE_DEFAULT_SCOPE_CONSTANT } from '../../../../api/google/drive/google-drive-default-scope.constant';
import {
  IMapOptionsWithGoogleIdentityServiceTokenLoaderFullInputOptions,
} from '../../../../api/google/wrap/map-options-with-google-identity-service-token-loader-full';
import {
  wrapFunctionWithGoogleIdentityServiceTokenLoaderFull,
} from '../../../../api/google/wrap/wrap-function-with-google-identity-service-token-loader-full';
import { googleDriveProtocolGuard } from '../../internal/google-drive-protocol-guard';

/*----------*/

const _googleDriveGetFileSize = wrapFunctionWithGoogleIdentityServiceTokenLoaderFull(googleDriveGetFileSize);
const _googleDriveDownloadFile = wrapFunctionWithGoogleIdentityServiceTokenLoaderFull(googleDriveDownloadFile);

/*----------*/

export type IGoogleDriveFileSystemReadFunctionNotifications = IFileSystemReadFunctionNotifications;

export interface ICreateGoogleDriveFileSystemReadFunctionOptions {
  clientId: string;
  apiKey: string;
}

export function createGoogleDriveFileSystemReadFunction(
  options: ICreateGoogleDriveFileSystemReadFunctionOptions,
): IFileSystemReadFunction {
  return (
    url: URL,
    buffer: Uint8Array,
    {
      start,
      end,
    }: IFileSystemReadOptions = {},
  ): IObservable<IFileSystemReadFunctionNotifications> => {
    return googleDriveProtocolGuard(url, (url: URL): IObservable<IFileSystemReadFunctionNotifications> => {
      const path: Path = urlToPath(url);
      const fileId: string = path.basenameOrThrow();

      const googleDriveGetFileOptions = {
        ...options,
        scope: GOOGLE_DRIVE_DEFAULT_SCOPE_CONSTANT,
        fileId,
      };

      const getFileSizeRequest$ = fromPromiseFactory<number>((): Promise<number> => {
        return _googleDriveGetFileSize(googleDriveGetFileOptions);
      });

      return pipe$$(getFileSizeRequest$, [
        fulfilled$$$(
          (size: number): IObservable<IGoogleDriveFileSystemReadFunctionNotifications> => {
            const [_start, _end] = fileRangeFromSize(size, start, end);

            return fromAsyncIterable(
              readGoogleDriveFile(
                googleDriveGetFileOptions,
                buffer,
                _start,
                _end,
              ),
            );
          },
        ),
      ]);
    });
  };
}

const CONTENT_RANGE_REG_EXP = new RegExp('^bytes\\s+(\\d+)-(\\d+)/(\\d+)$', 'g');

async function* readGoogleDriveFile(
  options: IMapOptionsWithGoogleIdentityServiceTokenLoaderFullInputOptions<IGoogleDriveDownloadFileOptions>,
  buffer: Uint8Array,
  start: number,
  end: number,
): AsyncGenerator<Uint8Array, void, void> {
  while (true) {
    const chunkSize: number = Math.min(end - start, buffer.length);
    if (chunkSize === 0) {
      return;
    }
    const response: Response = await _googleDriveDownloadFile({
      ...options,
      ranges: [
        [start, start + chunkSize - 1],
      ],
    });

    // if (response.headers.has('content-range')) {
    //   CONTENT_RANGE_REG_EXP.lastIndex = 0;
    //   const match: RegExpExecArray | null = CONTENT_RANGE_REG_EXP.exec(response.headers.get('Content-Range')!);
    //   if (match === null) {
    //     throw new Error(`Unsupported Content-Range format`);
    //   } else {
    //     const _start: number = Number(match[1]);
    //     const _end: number = Number(match[2]);
    //     const _size: number = Number(match[3]);
    //
    //     if (_start !== start) {
    //       throw new Error(`Invalid start`);
    //     }
    //
    //     if ((_end - 1) !== end) {
    //       throw new Error(`Invalid end`);
    //     }
    //   }
    // } else {
    //   throw new Error(`Missing header Content-Range`);
    // }

    const data: Uint8Array = new Uint8Array(await response.arrayBuffer());

    const bytesRead: number = data.length;

    if (bytesRead !== chunkSize) {
      throw new Error(`Invalid received content size`);
    }

    if (bytesRead === 0) {
      return;
    }

    buffer.set(data);

    const _buffer: Uint8Array = (buffer.length <= bytesRead)
      ? buffer
      : buffer.subarray(0, bytesRead);

    start += _buffer.length;

    yield _buffer;
  }
}

