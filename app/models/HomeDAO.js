/*function HomeDAO(connection){
    this._connection = connection;
}

HomeDAO.prototype.list = function(callback){
	this._connection.query("SELECT produto.id_produto, produto.nome_produto, produto.preco_produto, produto.descricao_produto, produto.imagem_produto, produto.desconto_produto, produto.nome_autor, produto.url_produto, categoria.nome_categoria, categoria.descricao_categoria FROM produto INNER JOIN categoria ON produto.id_categoria = categoria.id_categoria", callback);
}

module.exports = function(){
    return HomeDAO;
}*/
