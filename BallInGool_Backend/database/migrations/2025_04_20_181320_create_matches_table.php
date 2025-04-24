<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('matches', function (Blueprint $table) {
        $table->id();
        $table->unsignedBigInteger('fixture_id');
        $table->string('league');
        $table->string('home_team');
        $table->string('home_team_logo')->nullable();
        $table->string('away_team');
        $table->string('away_team_logo')->nullable();
        $table->integer('home_score')->nullable();
        $table->integer('away_score')->nullable();
        $table->dateTime('date');
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('matches');
    }
};
