# frozen_string_literal: true

class AttemptsController < ApplicationController
  before_action :load_attempt, except: :index
  def index
    quiz = Quiz.find_by(id: params[:quizid])
    @questions = quiz.questions
    @options = []
    @questions.each do |question|
      @options.push(question.options.as_json(only: %i[id content]))
    end
  end

  def update
    if @attempt.update({ submitted: true })
      render status: :ok, json: { notice: t("successfully_submiited") }
    else
      render status: :unprocessable_entity, json: { error: @attempt.errors.full_messages.to_sentence }
    end
  end

  def create_attempt_answers
    participantAnswerList = []
    quiz_question_params[:attempt_answers_attributes].each do |answer|
      question = Question.find_by(id: answer[:question_id])

      if question
        option = question.options.find_by(answer: true)
        merged_answer = answer.merge(option_id: option[:id])
        participantAnswerList << merged_answer
      else
        render status: :not_found, json: { error: t("not_found", entity: "Question") }
      end
    end

    unless @attempt.update({ attempt_answers_attributes: participantAnswerList })
      render status: :unprocessable_entity, json: { error: @attempt.errors.full_messages.to_sentence }
    end
  end

  def retrieve_attempt_answers
    @correct = @attempt.attempt_answers.select { |qa| qa.user_selected_option == qa.option_id }.size
    @incorrect = @attempt.attempt_answers.size - @correct
    res = @attempt.attempt_answers.map { |res|
{ "#{res.question_id}": { answer: res.user_selected_option, option_id: res.option_id } } }
    @result = res.inject(:merge!)
  end

  private

    def quiz_question_params
      params.require(:attempts).permit(attempt_answers_attributes: [:question_id, :user_selected_option])
    end

    def load_attempt
      @attempt = Attempt.find_by(id: params[:id])
      unless @attempt
        render status: :not_found, json: { error: t("not_found", entity: "Attempt") }
      end
    end
end
