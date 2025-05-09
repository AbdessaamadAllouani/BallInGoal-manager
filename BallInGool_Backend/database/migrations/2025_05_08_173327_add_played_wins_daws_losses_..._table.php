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
        Schema::table('standings', function (Blueprint $table) {
            $table->integer('played')->after('points')->default(0);
            $table->integer('wins')->aftar('played')->default(0);
            $table->integer('draws')->after('wins')->default(0);
            $table->integer('losses')->after('draws')->default(0);
            $table->string('team_name')->after('team_id')->nullable();
            $table->string('team_logo')->nullable()->after('team_name');
            $table->string('league_name')->nullable()->after('team_logo');
            $table->string('league_logo')->nullable()->after('league_name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('standings', function (Blueprint $table) {
            $table->dropColumn('played');
            $table->dropColumn('wins');
            $table->dropColumn('draws');
            $table->dropColumn('losses');
            $table->dropColumn('team_name');
            $table->dropColumn('team_logo');
            $table->dropColumn('league_name');
            $table->dropColumn('league_logo');
        });
    }
};
