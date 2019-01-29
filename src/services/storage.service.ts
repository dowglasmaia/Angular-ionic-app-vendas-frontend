import { Injectable } from "@angular/core";
import { LocalUser } from "../models/localUser";
import { STORAGE_KEYS } from "../config/storage_keys.config";
import { Cart } from "../models/cart";

/**
 * @author Dowglas Maia
 * Class de serviço do storangeUser
 */

@Injectable()
export class StorangeService {

    //Retorna o usuario Logado, armazenado no localStorange
    getLocalUser() : LocalUser {
        let usr = localStorage.getItem(STORAGE_KEYS.locaUser);
            if (usr == null) {
                return null;
            }
            else {
               return JSON.parse(usr); 
            }
    }

    //Recebe o LocalUser e Armazena no Storange
    setLocaUser(obj : LocalUser) {
        if (obj == null) {
            localStorage.removeItem(STORAGE_KEYS.locaUser);
        }
        else {
            localStorage.setItem(STORAGE_KEYS.locaUser, JSON.stringify(obj));
        }
    }

/* Obtendo e Salvando o Carrinho no LocalStorange*/
getCart(): Cart {
let str = localStorage.getItem(STORAGE_KEYS.cart);
    if (str != null) {
        return JSON.parse(str);
    }else {
        return null;
    }
}

setCart(obj: Cart) {
    if (obj != null) {
        localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(obj));
    } else {
        localStorage.removeItem(STORAGE_KEYS.cart);
    }
  }   
}