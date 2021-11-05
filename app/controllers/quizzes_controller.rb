# frozen_string_literal: true

class QuizzesController < ApplicationController
  def index
    @quizzes = Quiz.all
  end

  #   def create

  #   end
end
