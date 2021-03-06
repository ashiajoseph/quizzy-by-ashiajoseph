# frozen_string_literal: true

class QuizPolicy
  attr_reader :user, :quiz

  def initialize(user, quiz)
    @user = user
    @quiz = quiz
  end

  def show?
    quiz.user.id == user.id
  end

  def update?
    show?
  end

  def destroy?
    show?
  end

  def publish?
    show?
  end

  def create?
    user.administrator?
  end
end
