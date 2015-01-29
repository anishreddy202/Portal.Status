directory '/opt/application/' do
  owner 'deploy'
  group 'deploy'
  mode '0775'
  recursive true
  action :create
end

bash 'application_copy' do
  user 'deploy'
  group 'deploy'
  cwd '/opt/application'
  not_if 'test -f /home/vargrant/application'
  code <<-EOH
    cp -r /home/vagrant/application /opt/
  EOH
end

bash 'application_install' do
  cwd '/opt/application'
  code <<-EOH
    /opt/nodejs/bin/npm install --production
    chown -R deploy:deploy /opt/application/node_modules/
  EOH
end
