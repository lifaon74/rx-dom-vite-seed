import { IURI } from '@uni-fs/core';

// function extractPathSegmentsOfURI(uri: URI): string[] {
//   return uri.path.split('/')
//     .filter((segment: string): boolean => {
//       return segment !== '';
//     });
// }

export function extractPathSegmentsOfURI(uri: IURI): string[] {
  // let path: string = uri.path;
  //
  // if (!path.startsWith('/')) {
  //   path = '/' + path;
  // }

  const segments: string[] = uri.path.split('/');
  if (
    (segments.length > 1)
    && (segments[0] === '')
  ) {
    segments.shift();
  }

  return segments;
}

