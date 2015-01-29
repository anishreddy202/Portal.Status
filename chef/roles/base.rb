name 'base'
description 'MEAN Stack Base'

run_list 'recipe[base]',
         'recipe[ssh]',
         'recipe[knife-solo]',
         'recipe[swap]',
         'recipe[mongodb]',
         'recipe[nodejs]',
         'recipe[application::nodejs]',
         'recipe[nginx]',
         'recipe[application::nginx]'
