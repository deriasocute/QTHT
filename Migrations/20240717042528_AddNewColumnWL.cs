using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QTHT.Migrations
{
    public partial class AddNewColumnWL : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "Realtime",
                table: "WaterLevelConfig",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Realtime",
                table: "WaterLevelConfig");
        }
    }
}
