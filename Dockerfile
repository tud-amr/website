FROM jekyll/jekyll:latest

COPY Gemfile Gemfile.lock ./
RUN bundle install

