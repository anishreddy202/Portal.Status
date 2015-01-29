name 'application'
description 'MEAN Stack Empty Dev'

default_attributes 'node_env' => 'development',
                   'node_start_script' => '/opt/application/server/app.js'

run_list 'role[base]',
         'recipe[main_vagrant]',
         'recipe[genghisapp]',
         'recipe[knife-solo]'
