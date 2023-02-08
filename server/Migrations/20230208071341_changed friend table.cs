using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    public partial class changedfriendtable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FamilyId",
                table: "Friends");

            migrationBuilder.DropColumn(
                name: "FriendID",
                table: "Friends");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCreated",
                table: "Friends",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AddColumn<int>(
                name: "Family1_Id",
                table: "Friends",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Family2_Id",
                table: "Friends",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Friends",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Family1_Id",
                table: "Friends");

            migrationBuilder.DropColumn(
                name: "Family2_Id",
                table: "Friends");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Friends");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCreated",
                table: "Friends",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "FamilyId",
                table: "Friends",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "FriendID",
                table: "Friends",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
