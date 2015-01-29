# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = '2'

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.omnibus.chef_version = '12.0.3'
  config.vm.box = "phusion/ubuntu-14.04-amd64"

  config.vm.provision :chef_solo do |chef|
    chef.data_bags_path = 'chef/data_bags'
    chef.cookbooks_path = 'chef/site-cookbooks'
    chef.roles_path = 'chef/roles'
    chef.log_level = 'debug'
    chef.add_role 'vagrant'
  end

  config.ssh.insert_key = 'true'

  config.vm.network :forwarded_port, guest: 5678, host: 5678  # HTTP mongodb admin
  config.vm.network :forwarded_port, guest: 80, host: 3080 # NGINX HTTP Server
  config.vm.network :forwarded_port, guest: 5678, host: 5678  # HTTP mongodb admin
  config.vm.synced_folder "./src/dist", "/home/vagrant/application/", type: "rsync"

  config.vm.provider :virtualbox do |vb|
    vb.customize ["modifyvm", :id, "--memory", "1024"]
  end

  config.vm.provider :vmware_fusion do |vf|
    vf.gui = false
    vf.vmx["memsize"] = "1024"
    vf.vmx["numvcpus"] = "2"
  end

end
