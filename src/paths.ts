import 'module-alias/register';
import { addAliases  } from "module-alias"; 

addAliases({
    "@base": __dirname + "/libs/structure/base",
	"@Client": __dirname + "/libs/structure/client/client",
	"@clients": __dirname + "/libs/structure/client",
	"@Config": __dirname + "/assets/config"
})
