require "bundler/capistrano"

server "192.168.33.10", :web, :app, :db, primary: true

set :user, "deployer"
set :application, "avm"
set :deploy_to, "/u/apps/#{application}"
set :use_sudo, false
set :normalize_asset_timestamps, false

set :scm, "git"
set :repository, "https://github.com/klgilbert/avm.git"
set :branch, "master"

default_run_options[:pty] = true
ssh_options[:forward_agent] = true

after "deploy", "deploy:cleanup" # keep only the last 5 releases

namespace :unicorn do
  desc "Start unicorn for this application"
  task :start do
    run "cd #{current_path} && bundle exec unicorn -c /etc/unicorn/#{application}.conf.rb -D -E production"
  end
end

namespace :deploy do
  task :create_symlink do; end
end

# Bug with Capistrano - current directory not being created
namespace :deploy do
  desc "Recreate symlink"
  task :resymlink, :roles => :app do
    run "rm -f #{current_path} && ln -s #{release_path} #{current_path}"
  end
end
after "deploy:symlink", "deploy:resymlink"

namespace :postgres do
  task :create_role do
    run %Q{#{sudo} -u postgres psql -c "create role deployer with password 'dev' createdb createrole login;"}
    run %Q{#{sudo} -u postgres psql -c "create database wod_production owner deployer;"}
  end
end

before "deploy:cold", "postgres:create_role"
