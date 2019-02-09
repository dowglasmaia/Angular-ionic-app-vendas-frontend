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
        let cart: Cart = { items: [] };
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
            cart.items.push({ quantidade: 1, produto: produto });
        }
        //retorna o cart atualizado
        this.storage.setCart(cart);
        return cart;
    }

    // Remover um produto do carrinho e atualizando o mesmo
    removeProduto(produto: ProdutoDTO): Cart {
        let cart = this.getCart();

        //verificando se o produto ja existe no carrinho e removendo o mesmo caso exista
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if (position != -1) {
            cart.items.splice(position, 1);
        }
        //armazena o carrinho atualizado e retorna o mesmo
        this.storage.setCart(cart);
        return cart;
    }

    //Incrementando e Atualizando a quantidade do produto no carrinho 
    incrementQuantity(produto: ProdutoDTO): Cart {
        let cart = this.getCart();

        //verificando se o produto ja existe no carrinho , se sim atualiza a quantidade do mesmo
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if (position != -1) {
            cart.items[position].quantidade++;
        }
        //armazena o carrinho atualizado e retorna o mesmo
        this.storage.setCart(cart);
        return cart;
    }

    //Decrementando e Atualizando a quantidade do produto no carrinho 
    decrementQuantity(produto: ProdutoDTO): Cart {
        let cart = this.getCart();

        //verificando se o produto ja existe no carrinho , se sim atualiza a quantidade do mesmo
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if (position != -1) {
            cart.items[position].quantidade--;

            //se a quantidade do produto chegar a zero, remove ele do carrinho
            if (cart.items[position].quantidade < 1) {
                cart = this.removeProduto(produto);
            }
        }
        //armazena o carrinho atualizado e retorna o mesmo
        this.storage.setCart(cart);
        return cart;
    }

    //retornando o valor total do carrinho
    total(): number {
        let cart = this.getCart();
        let sum = 0;
        /**percori todos os itens do carrinho, pegando o valor e somando cada um
         *  e multiplicando pela quantidade para retornar o valor total do carrinho.*/
        for (var i = 0; i < cart.items.length; i++) {
            sum += cart.items[i].produto.preco * cart.items[i].quantidade;
        }
        return sum;

    }
}