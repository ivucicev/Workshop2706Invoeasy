using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Invoeasy.Migrations
{
    /// <inheritdoc />
    public partial class InvoiceFK : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "InvoiceId",
                schema: "Invoice",
                table: "Item",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Item_InvoiceId",
                schema: "Invoice",
                table: "Item",
                column: "InvoiceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Item_Invoice_InvoiceId",
                schema: "Invoice",
                table: "Item",
                column: "InvoiceId",
                principalSchema: "Invoice",
                principalTable: "Invoice",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

        }


        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Item_Invoice_InvoiceId",
                schema: "Invoice",
                table: "Item");

            migrationBuilder.DropIndex(
                name: "IX_Item_InvoiceId",
                schema: "Invoice",
                table: "Item");

            migrationBuilder.DropColumn(
                name: "InvoiceId",
                schema: "Invoice",
                table: "Item");
        }
    }
}
