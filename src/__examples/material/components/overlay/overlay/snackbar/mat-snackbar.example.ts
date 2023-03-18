import { MatOverlayManager } from '../../manager/mat-overlay-manager';
import { MatSnackbarController } from './controllers/mat-snackbar-controller';
import { MatSnackbarQueueManager } from './controllers/mat-snackbar-queue-manager';

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
  const manager = MatOverlayManager.create();

  const openButton = document.createElement('button');
  openButton.innerText = 'open';
  document.body.appendChild(openButton);

  const closeButton = document.createElement('button');
  closeButton.innerText = 'close';
  document.body.appendChild(closeButton);

  const snackbar = MatSnackbarController.create({
    manager,
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tincidunt',
    horizontalPosition: 'left',
    verticalPosition: 'bottom',
  });

  openButton.onclick = () => snackbar.open();
  closeButton.onclick = () => snackbar.close();

}

function matSnackbarExample2(): void {
  const manager = MatOverlayManager.create();
  const matSnackbarQueueManager = new MatSnackbarQueueManager({ manager });

  const openButton = document.createElement('button');
  openButton.innerText = 'open';
  document.body.appendChild(openButton);

  const open = () => {
    const openPromise = matSnackbarQueueManager.open({
      message: getRandomText(),
      actionText: 'click me',
      displayDuration: 1000,
      onClickAction: () => {
        openPromise.then((close) => close());
      },
    });
  };

  openButton.onclick = open;
}

/*----------------------------*/

export function matSnackbarExample(): void {
  // matSnackbarExample1();
  matSnackbarExample2();
}
