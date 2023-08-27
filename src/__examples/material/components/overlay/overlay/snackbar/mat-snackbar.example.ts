import { openMatSnackbar } from '@lirx/dom-material';

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

  const open = () => {
    const openPromise = openMatSnackbar({
      message: getRandomText(),
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
      actionText: 'Click me',
      onClickAction: () => {
        openPromise.then((snackbar) => snackbar.close());
      },
    }, { displayDuration: 10000, queueStrategy: 'none' });
  };

  openButton.onclick = open;
}

/*----------------------------*/

export function matSnackbarExample(): void {
  matSnackbarExample1();
}
