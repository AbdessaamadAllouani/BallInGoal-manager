<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('team_statistics', function (Blueprint $table) {
            $table->integer('clean_sheets')->nullable();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('team_statistics', function (Blueprint $table) {
            $table->dropColumn('clean_sheets');

        });
    }
};
