// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';
import { get, param, getFilterSchemaFor, post, requestBody } from '@loopback/rest';
import { User } from '../models';
import { UserRepository } from '../repositories';
import { repository, Filter } from '@loopback/repository';

export class HelloController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) { }

  @get('/hello/{nama}/{vala}/{valb}/{id}')
  async hello(
    @param.path.string('nama') nama: string,
    @param.path.number('vala') vala: number,
    @param.path.number('valb') valb: number,
    @param.path.number('id') id: number,
  ): Promise<string> {
    var user = this.userRepository.findById(id);
    var value = vala + valb;
    return "hello " + nama + " hasil penjumlahan =  " + value + " " + (await user).nama;
  }

  @post('/savereceipt')
  async savereceipt(
    @requestBody() res: any,
  ): Promise<string> {
    var file = res.file;
    var fs = require('fs');
    fs.writeFile("kucobacoba.pdf", file, { encoding: 'base64' }, function () {
      console.log('File created');
    });
    return res.name + " Terbentuk";
  }

  @get('/test', {
    responses: {
      '200': {
        description: 'test for executing query',
      },
    },
  })
  async test(): Promise<any> {
    var res = this.userRepository.dataSource.execute('SELECT u.nama, ud.first_name FROM user u JOIN usr_detail ud on ud.userid = u.id');
    var arr = Array();
    arr = await res;
    return await arr[0].first_name;
  }

  // @post('/payments')
  // pay(@requestBody() result: any): Object {
  //   result.status = "success";
  //   return result;
  // }


}
