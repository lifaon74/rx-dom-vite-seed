import { createFluentDefaultCallFunctions } from '../built-in/call-function/built-in/create-fluent-default-call-functions';
import { createFluentMessageOptions } from '../built-in/message/create-fluent-message-options';
import { compileFluentResource } from '../compile/compile-fluent-resource';

export function debugFluent1(): void {
  // const msg = `# some comment`;
  // const msg = `hello = Hello, world!`;
  // const msg = `remove-bookmark = Really remove { $title }?`;
  // const msg = `time-elapsed = Time elapsed: { NUMBER($duration, maximumFractionDigits: 0) }s.`;
  // const msg = `log-time = Entry time: { DATETIME($date) }`;
//   const msg = `
// menu-save = Save
// help-menu-save = Click { menu-save } to save the file.
//   `;
//   const msg = `
// -https = https://{ $host }
// visit = Visit { -https(host: "example.com") } for more information.
//   `;
//   const msg = `
// -brand-name = Firefox
// about = About { -brand-name }.
// `;
//   const msg = `
// -brand-name =
//     { $case ->
//        *[nominative] Firefox
//         [locative] Firefoksie
//     }
//
// # "About Firefox."
// about = Informacje o { -brand-name(case: "locative") }.
// `;
//   const msg = `
// emails =
//     { $unreadEmails ->
//         [one] You have one unread email.
//        *[other] You have { $unreadEmails } unread emails.
//     }
//   `;
//   const msg = `
// your-rank = { PLURAL_RULES($pos, type: "ordinal") ->
//    [1] You finished first!
//    [one] You finished {$pos}st
//    [two] You finished {$pos}nd
//    [few] You finished {$pos}rd
//   *[other] You finished {$pos}th
// }
//   `;
//   const msg = `
// your-rank = { $pos ->
//    [1] You finished first!
//   *[other] { PLURAL_RULES($pos, type: "ordinal") ->
//      [one] You finished {$pos}st
//      [two] You finished {$pos}nd
//      [few] You finished {$pos}rd
//     *[other] You finished {$pos}th
//   }
// }
//   `;
//   const msg = `
// # Simple things are simple.
// hello-user = Hello, {$userName}!
//
// # Complex things are possible.
// shared-photos =
//     {$userName} {$photoCount ->
//         [one] added a new photo
//        *[other] added {$photoCount} new photos
//     } to {$userGender ->
//         [male] his stream
//         [female] her stream
//        *[other] their stream
//     }.
//   `;
//   const msg = `
// login-input = Predefined value
//     .placeholder = email@example.com
//     .aria-label = Login input value
//     .title = Type your login email
// `;
//   const msg = `
// -brand-name = Aurora
//     .gender = feminine
//
// update-successful =
//     { -brand-name.gender ->
//         [masculine] { -brand-name } został zaktualizowany.
//         [feminine] { -brand-name } została zaktualizowana.
//        *[other] Program { -brand-name } został zaktualizowany.
//     }
// `;
//   const msg = `
// list = This is my vehicles: { LIST("Motorcycle", "Bus", "Car") }.
//   `;
//   const msg = `
// list = This is my vehicles: { LIST($vehicles) }.
//   `;
  const msg = `
html = Click { LINK("Here") } to read the tutorial.
  `;

  const render = compileFluentResource(msg);

  const fluentMessageOptions = createFluentMessageOptions({
    ...createFluentDefaultCallFunctions(),
    variables: [
      ['title', 'Avatar'],
      // ['title', 12345],
      ['userName', 'Alice'],
      ['photoCount', 5],
      ['userGender', 'female'],
      ['duration', 1234.5678],
      ['date', Date.now()],
      ['pos', 1],
      ['vehicles', ['Motorcycle', 'Bus', 'Car']],
    ],
    functions: [
      ['LINK', (content: string): string => {
        return `<a>${content}</a>`;
      }],
    ],
  });

  // const key = 'remove-bookmark';
  // const key = 'shared-photos';
  // const key = 'time-elapsed';
  // const key = 'log-time';
  // const key = 'help-menu-save';
  // const key = 'visit';
  // const key = 'about';
  // const key = 'your-rank';
  // const key = 'list';
  const key = 'html';

  console.log(
    render(key, fluentMessageOptions),
  );
}
