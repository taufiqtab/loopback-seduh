// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';
import { get, param } from '@loopback/rest';

export class HelloController {
  @get('/hello/{nama}/{vala}/{valb}')
  async hello(
    @param.path.string('nama') nama: string,
    @param.path.number('vala') vala: number,
    @param.path.number('valb') valb: number,
  ): Promise<string> {
    var value = vala + valb;
    return "hello " + nama + " hasil penjumlahan =  " + value;
  }
}
