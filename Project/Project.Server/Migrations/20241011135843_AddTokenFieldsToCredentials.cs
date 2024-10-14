using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Project.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddTokenFieldsToCredentials : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "IdCompanies",
                table: "People",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<DateTime>(
                name: "ExpirationToken",
                table: "Credentials",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Token",
                table: "Credentials",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Advertisements",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Place = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Contract = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Skills = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DatePost = table.Column<DateTime>(type: "datetime2", nullable: true),
                    idCompanies = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Advertisements", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Advertisements_Like",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdPeople = table.Column<int>(type: "int", nullable: false),
                    IdAdvertisements = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Advertisements_Like", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Advertisements");

            migrationBuilder.DropTable(
                name: "Advertisements_Like");

            migrationBuilder.DropColumn(
                name: "ExpirationToken",
                table: "Credentials");

            migrationBuilder.DropColumn(
                name: "Token",
                table: "Credentials");

            migrationBuilder.AlterColumn<int>(
                name: "IdCompanies",
                table: "People",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);
        }
    }
}
