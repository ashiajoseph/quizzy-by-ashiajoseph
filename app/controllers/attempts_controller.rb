# frozen_string_literal: true

class AttemptsController < ApplicationController
  before_action :load_attempt
  after_action :store_correct_and_incorrect_answers_count, only: :create_attempt_answers

  # def update
  #   if @attempt.update({ submitted: true })
  #     render status: :ok, json: { notice: t("successfully_submiited") }
  #   else
  #     render status: :unprocessable_entity, json: { error: @attempt.errors.full_messages.to_sentence }
  #   end
  # end

  def create_attempt_answers
    quiz = Quiz.includes(questions: :options).find_by_id(@attempt.quiz_id)

    recordList = quiz.questions.map do |question|
      record = Hash.new
      user_selected_option = params[:attempt_answers_attributes][question[:id].to_s]
      correct_option = question.options.select { |option| option.answer }
      record = {
        user_selected_option: user_selected_option,
        question_id: question.id,
        option_id: correct_option[0].id
      }
      record
    end
    unless @attempt.update({ attempt_answers_attributes: recordList })
      render status: :unprocessable_entity, json: { error: @attempt.errors.full_messages.to_sentence }
    end
  end

  def retrieve_attempt_answers
    @correct = @attempt.correct_answers_count
    @incorrect = @attempt.incorrect_answers_count
    result_array = @attempt.attempt_answers.map { |user_answer|
{ "#{user_answer.question_id}": { answer: user_answer.user_selected_option, option_id: user_answer.option_id } } }
    @result = result_array.inject(:merge!)
  end

  private

    def load_attempt
      @attempt = Attempt.find_by(id: params[:id])
      unless @attempt
        render status: :not_found, json: { error: t("not_found", entity: "Attempt") }
      end
    end

    def store_correct_and_incorrect_answers_count
      correct = @attempt.attempt_answers.select { |answer| answer.user_selected_option == answer.option_id }.size
      incorrect = @attempt.attempt_answers.size - correct
      unless @attempt.update(submitted: true, correct_answers_count: correct, incorrect_answers_count: incorrect)
        render status: :unprocessable_entity, json: { error: @attempt.errors.full_messages.to_sentence }
      end
    end
end
