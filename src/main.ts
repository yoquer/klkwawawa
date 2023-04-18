import "./paths";
import Client from '@Client';
import colors from 'colors';

const client = new Client();
const { token } = client.config ?? {};

if (token) {
  console.log(colors.green('# # # # # # # # # #'));
  console.log('#'.green + ' Cofigo Prendido'.blue + ' #'.green);
  console.log('# # # # # # # # # #'.green);
  console.log(' ');

  client.login(token).catch(e => {
    if (e.code.includes('TokenInvalid')) {
      console.log('[TokenInvalido]: '.red + 'El token proporcionado no es valido o es incorrecto'.gray);
    }
  });
} else {
  console.log('[Error]:'.red+' No se proporciono un token en app/config'.gray);
  process.exit(1);
}
