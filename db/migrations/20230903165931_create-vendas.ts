import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("vendas", (table) => {
    // Tabela Cliente
    table.increments("cliente_id").primary();
    table.string("nome_cliente").notNullable();
    table.string("email_cliente").notNullable();
    table.string("telefone_cliente");
    table.string("cpf_cliente").notNullable();

    // Tabela Pedido
    table.increments("pedido_id").primary();
    table.integer("cliente_id_pedido").unsigned().notNullable();
    table
      .foreign("cliente_id_pedido")
      .references("cliente_id")
      .inTable("vendas");
    table.timestamp("data_pedido").notNullable();
    table.decimal("total", 10, 2).notNullable();
    table.string("status_pagamento").notNullable();

    // Tabela Item do Pedido
    table.increments("item_pedido_id").primary();
    table.integer("pedido_id_item").unsigned().notNullable();
    table.foreign("pedido_id_item").references("pedido_id").inTable("vendas");
    table.integer("produto_id").notNullable();
    table.integer("quantidade").notNullable();
    table.decimal("preco_unitario", 10, 2).notNullable();

    // Tabela Venda/Saída
    table.increments("venda_id").primary();
    table.integer("pedido_id_venda").unsigned().notNullable();
    table.foreign("pedido_id_venda").references("pedido_id").inTable("vendas");
    table.timestamp("data_saida").notNullable();
    table.integer("funcionario_id").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("vendas");
}
