import { single } from '@lirx/core';
import { VirtualCustomElementNode } from '@lirx/dom';
import {
  IMatSnackbarComponentConfig,
  IMatSnackbarData,
  MatOverlay,
  MatSnackbarController,
  MatSnackbarQueueController,
} from '@lirx/dom-material';

/*----------------------------*/

function getRandomText(): string {
  const texts = [
    `Cordially convinced did incommode existence put out suffering certainly.`,
    `Besides another and saw ferrars limited ten say unknown.`,
    `Να ατ προσωπικών χρειάζεται κατανοήσει.`,
    `Ecstatic advanced and procured civility not absolute put continue. Overcame breeding or my concerns removing desirous so absolute. My melancholy unpleasing imprudence considered in advantages so impression. Almost unable put piqued talked likely houses her met. Met any nor may through resolve entered. An mr cause tried oh do shade happy.`,
  ];
  return texts[Math.floor(Math.random() * texts.length)];
}

function matSnackbarExample1(): void {

  const openButton = document.createElement('button');
  openButton.innerText = 'open';
  document.body.appendChild(openButton);

  let snackbar: MatOverlay<VirtualCustomElementNode<IMatSnackbarComponentConfig>, IMatSnackbarData> | undefined;

  openButton.onclick = () => {
    if (snackbar === void 0) {
      snackbar = MatSnackbarController.open(
        single({
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tincidunt',
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          actionText: 'Click me',
          onClickAction: () => {
            snackbar?.close();
          },
        }),
      );
    } else {
      snackbar.close();
      snackbar = void 0;
    }
  };
}

function matSnackbarExample2(): void {

  const openButton = document.createElement('button');
  openButton.innerText = 'open';
  document.body.appendChild(openButton);

  const open = () => {
    const openPromise = MatSnackbarQueueController.openStatic({
      message: getRandomText(),
      actionText: 'click me',
      onClickAction: () => {
        openPromise.then((snackbar) => snackbar.close());
      },
    }, { displayDuration: 10000 });
  };

  openButton.onclick = open;
}

/*----------------------------*/

export function matSnackbarExample(): void {
  matSnackbarExample1();
  // matSnackbarExample2();
}
