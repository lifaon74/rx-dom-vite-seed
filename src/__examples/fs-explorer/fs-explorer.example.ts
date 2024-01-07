import { googleDriveListFiles } from './api/google/drive/list-files/google-drive-list-files';
import { GOOGLE_API_CONFIGURATION } from './api/google/google-api-configuration.constant.private';
import { createGoogleDriveFileSystem } from './uni-fs/google-drive/create-google-drive-file-system';
import { Abortable } from '@lirx/async-task';
import {
  wrapFunctionWithGoogleIdentityServiceTokenLoader,
} from './api/google/wrap/wrap-function-with-google-identity-service-token-loader';
import { asyncFetchWithoutCors } from '../../helpers/get-cors-proxy-url';
import {
  placeFloatingOnBest,
  createFloatingMinSizeRelativeToContainerFromDomRect,
  createReferenceBoxRelativeToContainerFromDomRects,
  convertPlacedFloatingToCssTranslate,
  convertPlacedFloatingToCssTransformOrigin,
  convertPlacedFloatingToCssMaxSize,
  placeFloating, def, ghi, b, a,
} from './app/components/file-list/store/floating';

// export async function debugGoogleDriveFS1() {
//   const token = await getGoogleDriveToken({
//     clientId: GOOGLE_API_CONFIG.clientId,
//   });
//
//   // console.log(token);
//
//   // https://developers.google.com/drive/api/v3/reference/about/get
//   // https://developers.google.com/drive/api/v3/reference/files/list
//
//   // const response = await fetch(`https://www.googleapis.com/drive/v3/about?fields=*&key=${API_KEY}`, {
//   //   headers: new Headers([
//   //     ['authorization', `Bearer ${token}`],
//   //   ]),
//   // });
//
//   const response = await fetch(`https://www.googleapis.com/drive/v3/files?fields=*&key=${GOOGLE_API_CONFIG.apiKey}&pageSize=10`, {
//     headers: new Headers([
//       ['authorization', `Bearer ${token}`],
//     ]),
//   });
//
//   const responseData = await response.json();
//   console.log(responseData);
// }

// export async function debugGoogleDriveFS2() {
//   const _fetch = createGoogleAPIFetcher({
//     ...GOOGLE_API_CONFIG,
//     scope: 'https://www.googleapis.com/auth/drive.metadata.readonly',
//   });
//   const files = await _fetch({
//     url: generateGoogleDriveAPIURL('files'),
//   });
//   console.log(files);
// }

export async function debugGoogleDriveFS2() {

  const _googleDriveListFiles = wrapFunctionWithGoogleIdentityServiceTokenLoader(googleDriveListFiles);

  // const files = await _googleDriveListFiles({
  //   ...GOOGLE_API_CONFIGURATION,
  //   scope: GOOGLE_DRIVE_DEFAULT_SCOPE_CONSTANT,
  // });
  //
  // console.log(files);
}

export async function debugGoogleDriveFS3() {
  const fs = createGoogleDriveFileSystem(GOOGLE_API_CONFIGURATION);

  console.log(fs.getSchemes());
  // console.log(await toPromiseAll(fs.children(new URL('google-drive://'))));
  // console.log(
  //   await fs.list({
  //     // url: new URL('google-drive:'),
  //     url: new URL('google-drive:["19PRG5cqkfp_LRJM36aP5wGcmaWyDVAoH"]'),
  //     abortable: Abortable.never,
  //     withMetadata: true,
  //   }).toPromise(),
  // );
}

// https://www.webdavserver.com/Userdf20212
async function debugWebDAV() {
  const request = `
    <?xml version="1.0"?>
    <propfind xmlns="DAV:">
        <prop>
            <resourcetype/>
            <displayname/>
            <creationdate/>
            <getlastmodified/>
            <getcontenttype/>
            <getcontentlength/>
            <supportedlock/>
            <lockdiscovery/>
            <quota-available-bytes/>
            <quota-used-bytes/>
            <checked-in/>
            <checked-out/>
        </prop>
    </propfind>
  `;
  const response = await asyncFetchWithoutCors('https://www.webdavserver.com/Userdf20212', {
    method: 'PROPFIND',
    body: request.trim(),
  }, Abortable.never).toPromise();

  const doc = new DOMParser().parseFromString(await response.text(), 'text/xml');
  console.log(doc);
  Object.assign(window, {
    doc,
  });
}

function debugFloatingArea() {
  document.body.style.overflow = 'auto';

  const dummy = (name: string, color: string, width: number, height: number, left: number, top: number) => {
    const element = document.createElement('div');
    element.innerText = name;
    Object.assign(element.style, {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      backgroundColor: color,
      width: `${width}px`,
      height: `${height}px`,
      left: `${left}px`,
      top: `${top}px`,
      pointerEvents: 'none',
    });
    document.body.appendChild(element);
    return element;
  };

  const bottom = dummy('bottom', 'black', 1, 1, 1, 6000);
  const right = dummy('right', 'black', 1, 1, 6000, 1);
  const reference = dummy('reference', 'red',100, 60, 400, 400);
  const floating = dummy('floating', 'green', 80, 50, 0, 0);
  const maxFloating = dummy('', 'rgba(0, 0, 0, 0.1)', 80, 50, 0, 0);

  const container = document.body;

  const minSize = {
    minWidth: floating.offsetWidth,
    minHeight: floating.offsetHeight,
  };

  const update = () => {
    const containerRect = container.getBoundingClientRect();
    const referenceRect = reference.getBoundingClientRect();

    // top-left
    // const a = def({
    //   anchorPositionRelativeToReference: [0, 0], // top-left of the reference
    //   anchorPositionRelativeToFloating: [0, 1], // bottom-left of the floating
    // });

    // console.log(b(-2, [10, 3]));
    // console.log(a(-2, [10, 3]));
    // console.log(a(-0.5, [10, 3]));
    const a = ghi({
      anchorPositionRelativeToFloating: -1, // left of floating
      anchorPositionRelativeToContainer: (1 / 5) * 2 - 1,// (1 / 5),
      // anchorPositionRelativeToContainer: -0.5,
      floatingMinSizeRelativeToContainer: 3 / 5,
      // startOverflow: 'overflow',
      startOverflow: 'push',
      // endOverflow: 'overflow',
      endOverflow: 'push',
    });
    //
    // console.log('a', a);

    // const result = placeFloatingOnBest(
    //   createReferenceBoxRelativeToContainerFromDomRects(
    //     containerRect,
    //     referenceRect,
    //   ),
    //   createFloatingMinSizeRelativeToContainerFromDomRect(
    //     containerRect,
    //     minSize,
    //   ),
    //   [
    //     // placeFloatingOnTopLeftOverflow,
    //     // placeFloatingOnTopLeftShrink,
    //     // placeFloatingOnTopLeftPush,
    //
    //     // placeFloating('top-left-push-overflow-push-overflow'),
    //     // placeFloating('top-left-push-overflow-overflow-overflow'),
    //     // placeFloating('top-left-overflow-overflow-push-overflow'),
    //     // placeFloating('top-left-overflow-overflow-overflow-overflow'),
    //     // placeFloating('top-left-shrink-overflow-push-overflow'),
    //     // placeFloating('top-left-shrink-overflow-overflow-overflow'),
    //
    //     // placeFloating('top-left-push-push-push-push'),
    //     // placeFloating('top-left-push-overflow-push-push'),
    //     // placeFloating('top-left-push-shrink-push-push'),
    //     // placeFloating('top-left-push-push-push-overflow'),
    //     // placeFloating('top-left-push-overflow-push-overflow'),
    //     // placeFloating('top-left-push-shrink-push-overflow'),
    //
    //     // placeFloating('top-right-push-push-push-push'),
    //     // placeFloating('top-center-push-push-push-push'),
    //     placeFloating('top-center-overflow-overflow-overflow-overflow'),
    //
    //     // placeFloating('top-left-shrink-overflow'),
    //     // placeFloating('top-left-push-overflow'),
    //     // placeFloating('top-left-push-shrink'),
    //     // placeFloating('top-left-push-push'),
    //   ],
    // );
    //
    // // console.log(result);
    //
    // const maxSize = convertPlacedFloatingToCssMaxSize(result, containerRect);
    //
    // Object.assign(floating.style, {
    //   position: 'fixed',
    //   translate: convertPlacedFloatingToCssTranslate(result, containerRect).join(' '),
    //   transformOrigin: convertPlacedFloatingToCssTransformOrigin(result).join(' '),
    //   maxWidth: maxSize[0],
    //   maxHeight: maxSize[1],
    // });
    //
    // Object.assign(maxFloating.style, {
    //   position: 'fixed',
    //   translate: convertPlacedFloatingToCssTranslate(result, containerRect).join(' '),
    //   transformOrigin: convertPlacedFloatingToCssTransformOrigin(result).join(' '),
    //   width: maxSize[0],
    //   height: maxSize[1],
    // });

    // console.log(result);
  };

  const loop = () => {
    requestAnimationFrame(() => {
      update();
      // loop();
    });
  };

  loop();
}

export async function fsExplorerExample() {
  // bootstrap(AppMainComponent);

  // debugGoogleDriveFS1();
  // debugGoogleDriveFS2();
  debugGoogleDriveFS3();

  // await debugWebDAV();
  // debugFloatingArea();

}

