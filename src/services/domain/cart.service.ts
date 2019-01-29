import { Injectable } from "@angular/core";
import { StorangeService } from "../storage.service";
import { Cart } from "../../models/cart";
import { ProdutoDTO } from "../../models/produto.dto";

@Injectable()
export class CartService {
    constructor(public storage: StorangeService) {

    }

    //criando ou limpando o carrinho
    creatOrClearCart(): Cart {
        let cart: Cart = {items: []};
        this.storage.setCart(cart);
        return cart;
    }

    //Obtendo o carrinho do localStorange se estiver null um novo carrinho e criado.
    getCart(): Cart {
        let cart: Cart = this.storage.getCart();
            if (cart == null) {
                cart = this.creatOrClearCart(); // se for nulo cria um cart
            }
        return cart;
    }

    // adionando um produto ao carrinho e atualizando o mesmo
    addProduto(produto: ProdutoDTO): Cart {
        let cart = this.getCart();

        //verificando se o produto ja existe no carrinho
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if (position == -1) {
            cart.items.push({quantidade: 1, produto: produto});
        }
        //retorna o cart atualizado
        this.storage.setCart(cart);
        return cart;
    }
}