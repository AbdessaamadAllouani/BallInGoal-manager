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
            $table->integer('penalties_scored')->nullable();
            $table->integer('penalties_missed')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('team_statistics', function (Blueprint $table) {
            $table->dropColumn('penalties_scored');
            $table->dropColumn('penalties_missed');
        });
    }
};
