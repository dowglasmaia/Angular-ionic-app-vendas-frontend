import { Injectable } from "@angular/core";
import { LocalUser } from "../models/localUser";
import { STORAGE_KEYS } from "../config/storage_keys.config";

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

}