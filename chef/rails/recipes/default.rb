include_recipe "nginx"
include_recipe "unicorn"

package "libsqlite3-dev"

gem_package "bundler"

common = {:name => "avm", :app_root => "/u/apps/avm"}

directory common[:app_root] do
  owner "deployer"
  recursive true
end

directory common[:app_root]+"/shared" do
  owner "deployer"
end

%w(config log tmp sockets pids).each do |dir|
  directory "#{common[:app_root]}/shared/#{dir}" do
    owner "deployer"
    recursive true
    mode 0755
  end
end

template "#{node[:unicorn][:config_path]}/#{common[:name]}.conf.rb" do
  mode 0644
  source "unicorn.conf.erb"
  variables common
end

nginx_config_path = "/etc/nginx/sites-available/#{common[:name]}"

template nginx_config_path do
  mode 0644
  source "nginx.conf.erb"
  variables common.merge(:server_names => "#{node[:app][:name]}")
  notifies :reload, "service[nginx]"
end

nginx_site "#{common[:name]}" do
  config_path nginx_config_path
  action :enable
end
