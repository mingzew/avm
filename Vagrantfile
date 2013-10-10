# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "avm-dev"
  config.vm.box_url = "https://www.dropbox.com/s/9ec68pn2de1m792/avm-dev.box"
  config.vm.network "private_network", ip: "192.168.33.10"
  #config.vm.provider :virtualbox do |v|
    #v.customize ["modifyvm", :id, "--memory", 1024]
  #end

  #config.vm.provision :shell, :inline => "apt-get -qq update && apt-get -qq -y install ruby2.0.0 build-essential && gem install chef --no-rdoc --no-ri --conservative"

  #chef_cookbooks_path = ["chef/cookbooks"]

  ## This run uses the updated chef-solo and does normal configuration
  #config.vm.provision :chef_solo do |chef|
    #chef.binary_env = "GEM_HOME=/opt/chef/embedded/lib/ruby/gems/1.9.1/ GEM_PATH= "
    #chef.binary_path = "/opt/chef/bin/"
    #chef.cookbooks_path = chef_cookbooks_path

    #chef.add_recipe "recipe[nginx]"
    #chef.add_recipe "recipe[nodejs]"
    #chef.add_recipe "recipe[postgresql]"
    #chef.add_recipe "recipe[rails]"
    #chef.add_recipe "recipe[unicorn]"
    #chef.add_recipe "recipe[zsh]"
  #end
end
