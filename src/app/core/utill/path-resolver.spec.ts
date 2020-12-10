import {PathResolver} from './path-resolver';

describe('PathResolver', () => {

    let pathResolver;

    beforeEach(() => {
       pathResolver = new PathResolver();
    });

    describe('withPart', () => {

        it('should allow empty base parts', () => {
            expect(pathResolver.resolve('test')).toEqual('test');
        });

        it('should trim leading and trailing slashes', () => {
           pathResolver.withPart('/path/');

           expect(pathResolver.resolve()).toEqual('path');
        });

        it('should ignore null or undefined parts', () => {
          pathResolver.withPart(null).withPart(undefined);

          expect(pathResolver.resolve()).toEqual('');
        });

        it('should join multiple base parts with a \'/\'', () => {
          pathResolver.withPart('test').withPart('path');

          expect(pathResolver.resolve()).toEqual('test/path');
        });

    });

    describe('resolve', () => {

        it('should allow calls with 0 arguments', () => {
            expect(pathResolver.withPart('test').resolve()).toEqual('test');
        });

        it('should join parts to the base parts with a \'/\'', () => {
           pathResolver.withPart('test');

           const result = pathResolver.resolve('path');
           expect(result).toEqual('test/path');
        });

        it('should join multiple parts with a \'/\'', () => {
           const result = pathResolver.resolve('test', 'path');
           expect(result).toEqual('test/path');
        });

        it('should trim leading and trailing slashes', () => {
           const result = pathResolver.resolve('/test/');

           expect(result).toEqual('test');
        });

        it('should ignore null, undefined, and empty parts', () => {
           const result = pathResolver.resolve('test', null, 'resource', undefined, 'path', '');

           expect(result).toEqual('test/resource/path');
        });
    });

});
