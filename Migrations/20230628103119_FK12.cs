using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Invoeasy.Migrations
{
    /// <inheritdoc />
    public partial class FK12 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Invoice_Customer_CustomerId",
                schema: "Invoice",
                table: "Invoice");

            migrationBuilder.DropIndex(
                name: "IX_Invoice_CustomerId",
                schema: "Invoice",
                table: "Invoice");

            migrationBuilder.RenameColumn(
                name: "CustomerId",
                schema: "Invoice",
                table: "Invoice",
                newName: "InvoiceCustomerId");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                schema: "Invoice",
                table: "Item",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                schema: "Invoice",
                table: "Invoice",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateTable(
                name: "InvoiceCustomer",
                schema: "Invoice",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CustomerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    ModifiedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    ReadAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    Active = table.Column<bool>(type: "bit", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InvoiceCustomer", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InvoiceCustomer_Customer_CustomerId",
                        column: x => x.CustomerId,
                        principalSchema: "Customer",
                        principalTable: "Customer",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Invoice_InvoiceCustomerId",
                schema: "Invoice",
                table: "Invoice",
                column: "InvoiceCustomerId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_InvoiceCustomer_CustomerId",
                schema: "Invoice",
                table: "InvoiceCustomer",
                column: "CustomerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Invoice_InvoiceCustomer_InvoiceCustomerId",
                schema: "Invoice",
                table: "Invoice",
                column: "InvoiceCustomerId",
                principalSchema: "Invoice",
                principalTable: "InvoiceCustomer",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Invoice_InvoiceCustomer_InvoiceCustomerId",
                schema: "Invoice",
                table: "Invoice");

            migrationBuilder.DropTable(
                name: "InvoiceCustomer",
                schema: "Invoice");

            migrationBuilder.DropIndex(
                name: "IX_Invoice_InvoiceCustomerId",
                schema: "Invoice",
                table: "Invoice");

            migrationBuilder.RenameColumn(
                name: "InvoiceCustomerId",
                schema: "Invoice",
                table: "Invoice",
                newName: "CustomerId");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                schema: "Invoice",
                table: "Item",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                schema: "Invoice",
                table: "Invoice",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Invoice_CustomerId",
                schema: "Invoice",
                table: "Invoice",
                column: "CustomerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Invoice_Customer_CustomerId",
                schema: "Invoice",
                table: "Invoice",
                column: "CustomerId",
                principalSchema: "Customer",
                principalTable: "Customer",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
