# Configuración del Bot
Aquí se encuentra la configuración básica del bot, que incluye el token del bot y el estado del bot.

## **Token del Bot**
```vbnet
token: ''
```

<h3>El token del bot es una cadena de caracteres que se obtiene al registrar el bot en la plataforma de desarrollo de bots, como Discord. Este token es necesario para que el bot pueda autenticarse y conectarse al servidor de Discord.<h3>

## **Estado del Bot**
```lua
bot_activity:
  status: ""
  name: ""
  game: ""
```
<h3>El estado del bot define cómo aparecerá el bot en Discord en términos de su actividad y estado. Puedes configurar el estado del bot con los siguientes parámetros:<h3>

• **status**: Puedes establecer el estado del bot como **idle** (inactivo), **online** (en línea), **invisible** (invisible) o **dnd** (no molestar).

• **name**: Aquí puedes establecer el nombre de la actividad del bot, que se mostrará en Discord.

•**game**: Puedes especificar el tipo de actividad del bot como **Playing** (jugando), **Streaming** (transmitiendo) o **Watching** (viendo).

<h3>Estos son los principales ajustes de configuración del bot que puedes establecer para personalizar su apariencia y comportamiento en Discord. Asegúrate de proporcionar un token válido y configurar el estado del bot de acuerdo a tus necesidades antes de poner en funcionamiento tu bot en Discord. ¡Diviértete programando tu bot!<h3>