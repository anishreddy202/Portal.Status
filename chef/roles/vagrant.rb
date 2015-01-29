name 'vagrant'
description 'MEAN Stack Box with Application'

default_attributes 'node_env' => 'production',
                   'node_start_script' => '/opt/application/server/app.js'

run_list 'role[base]',
         'recipe[main_vagrant]',
         'recipe[genghisapp]',
         'recipe[application::deploy]'
