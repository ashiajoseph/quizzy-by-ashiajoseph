# frozen_string_literal: true

class QuestionPolicy
  attr_reader :user, :question

  def initialize(user, question)
    @user = user
    @question = question
  end

  def show?
    @question.quiz.user.id == user.id
  end

  def update?
    show?
  end

  def destroy?
    show?
  end

  def create?
    show?
  end
end
