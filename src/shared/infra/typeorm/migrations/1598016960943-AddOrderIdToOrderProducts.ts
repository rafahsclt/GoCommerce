import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export default class AddOrderIdToOrderProducts1598016960943 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('order_products', new TableColumn({
            name: 'order_id',
            type: 'uuid',
            isNullable: true
        }))
        
        await queryRunner.createForeignKey('order_products', new TableForeignKey({
            name: 'OrderProductsOrder',
            columnNames: ['order_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'orders',
            onDelete: 'SET NULL'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('order_products', 'OrderProductsOrder')
        await queryRunner.dropColumn('order_products', 'order_id')
    }

}
