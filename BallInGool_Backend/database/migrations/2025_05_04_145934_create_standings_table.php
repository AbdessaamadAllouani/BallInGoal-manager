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
        Schema::create('standings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('team_id')->constrained('teams');
            $table->foreignId('league_id')->constrained('leagues');
            $table->integer('season');
            $table->integer('rank');
            $table->integer('points');
            $table->integer('goals_diff');
            $table->integer('played');
            $table->integer('wins');
            $table->integer('draws');
            $table->integer('losses');
            $table->string('team_name');
            $table->string('team_logo')->nullable();
            $table->string('league_name')->nullable();
            $table->string('league_logo')->nullable();
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('standings');
    }
};
