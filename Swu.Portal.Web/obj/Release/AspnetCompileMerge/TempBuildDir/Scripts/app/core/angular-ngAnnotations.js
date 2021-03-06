var ngAnnotations;
(function (ngAnnotations) {
    'use strict';
    function Module(name) {
        return provideAngularComponent;
        function provideAngularComponent(constrFn) {
            constrFn.$$annotationConfig.providerFn(name, constrFn);
        }
    }
    ngAnnotations.Module = Module;
    function Config(constrFn) {
        constrFn.$$annotationConfig = { providerFn: _provideConfig };
    }
    ngAnnotations.Config = Config;
    function Constant(config) {
        config.providerFn = _provideConstant;
        return _decorateProviderClass(config);
    }
    ngAnnotations.Constant = Constant;
    function Controller(config) {
        config.providerFn = _provideController;
        return _decorateProviderClass(config);
    }
    ngAnnotations.Controller = Controller;
    function Directive(config) {
        config.providerFn = _provideDirective;
        return _decorateProviderClass(config);
    }
    ngAnnotations.Directive = Directive;
    function Factory(config) {
        config.providerFn = _provideFactory;
        return _decorateProviderClass(config);
    }
    ngAnnotations.Factory = Factory;
    function Provider(config) {
        config.providerFn = _provideProvider;
        return _decorateProviderClass(config);
    }
    ngAnnotations.Provider = Provider;
    function Run(constrFn) {
        constrFn.$$annotationConfig = { providerFn: _provideRun };
    }
    ngAnnotations.Run = Run;
    function Service(config) {
        config.providerFn = _provideService;
        return _decorateProviderClass(config);
    }
    ngAnnotations.Service = Service;
    function Value(config) {
        config.providerFn = _provideValue;
        return _decorateProviderClass(config);
    }
    ngAnnotations.Value = Value;
    function Decorator(config) {
        config.providerFn = _provideDecorator;
        return _decorateProviderClass(config);
    }
    ngAnnotations.Decorator = Decorator;
    function Filter(config) {
        config.providerFn = _provideFilter;
        return _decorateProviderClass(config);
    }
    ngAnnotations.Filter = Filter;
    function _decorateProviderClass(config) {
        return function (constrFn) {
            constrFn.$$annotationConfig = config;
        };
    }
    function _provideConfig(module, constrFn) {
        angular.module(module).config(_normalizeFunction(constrFn));
    }
    function _provideConstant(module, constrFn) {
        var constant = angular.isFunction(constrFn) ? new constrFn() : constrFn;
        var name = constrFn.$$annotationConfig.name;
        angular.module(module).constant(name, constant);
    }
    function _provideController(module, constrFn) {
        var config = constrFn.$$annotationConfig;
        var name = config.name;
        angular.module(module).controller(name, _normalizeFunction(constrFn));
        if (config.when) {
            var routeConfig = ['$routeProvider', function ($routeProvider) {
                    $routeProvider.when(config.when.path, config.when.route);
                }];
            angular.module(module).config(routeConfig);
        }
    }
    function _provideDirective(module, constrFn) {
        if (!constrFn.prototype.compile) {
            constrFn.prototype.compile = function () {
            };
        }
        var originalCompileFn = _cloneFunction(constrFn.prototype.compile);
        _override(constrFn.prototype, 'compile', function () {
            return function () {
                originalCompileFn.apply(this, arguments);
                if (constrFn.prototype.link) {
                    return constrFn.prototype.link.bind(this);
                }
            };
        });
        var inlineArrayAnnotation = _createInlineArrayAnnotation(_normalizeFunction(constrFn));
        var name = constrFn.$$annotationConfig.name;
        angular.module(module).directive(_toCamelCase(name), inlineArrayAnnotation);
    }
    function _provideFactory(module, constrFn) {
        var inlineArrayAnnotation = _createInlineArrayAnnotation(_normalizeFunction(constrFn));
        var name = constrFn.$$annotationConfig.name;
        angular.module(module).factory(name, inlineArrayAnnotation);
    }
    function _provideProvider(module, constrFn) {
        var config = constrFn.$$annotationConfig;
        var name = config.name;
        var providerName = name.replace(/[pP]+rovider/i, '');
        angular.module(module).provider(providerName, _createServiceProvider(constrFn));
    }
    function _provideService(module, constrFn) {
        var name = constrFn.$$annotationConfig.name;
        angular.module(module).service(name, _normalizeFunction(constrFn));
    }
    function _provideRun(module, constrFn) {
        angular.module(module).run(_normalizeFunction(constrFn));
    }
    function _provideValue(module, constrFn) {
        var val = angular.isFunction(constrFn) ? new constrFn() : constrFn;
        var name = constrFn.$$annotationConfig.name;
        angular.module(module).value(name, val);
    }
    function _provideDecorator(module, constrFn) {
        angular.module(module).config(['$provide', function ($provide) {
                var name = constrFn.$$annotationConfig.name;
                $provide.decorator(name, constrFn);
            }]);
    }
    function _provideFilter(module, constrFn) {
        var name = constrFn.$$annotationConfig.name;
        angular.module(module).filter(name, constrFn);
    }
    function _createInlineArrayAnnotation(constrFn, provider) {
        var injects = constrFn.$inject || [];
        var inlineArrayAnnotation = injects.slice();
        inlineArrayAnnotation.push(function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            args.unshift(this);
            var instance = new (Function.prototype.bind.apply(constrFn, args));
            return instance;
        });
        return inlineArrayAnnotation;
    }
    function _cloneFunction(original) {
        return function () {
            return original.apply(this, arguments);
        };
    }
    function _override(object, methodName, callback) {
        object[methodName] = callback(object[methodName]);
    }
    function _normalizeFunction(constrFn) {
        if (constrFn.$inject) {
            return constrFn;
        }
        else {
            var paramNames = _getParamNames(constrFn);
            constrFn.$inject = paramNames;
            return constrFn;
        }
    }
    function _getParamNames(constrFn) {
        var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
        var ARGUMENT_NAMES = /([^\s,]+)/g;
        var fnStr = constrFn.toString().replace(STRIP_COMMENTS, '');
        var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
        if (result === null)
            result = [];
        return result;
    }
    function _toCamelCase(str) {
        return str
            .replace(/\s(.)/g, function ($1) {
            return $1.toUpperCase();
        })
            .replace(/\s/g, '')
            .replace(/^(.)/, function ($1) {
            return $1.toLowerCase();
        });
    }
    function _createServiceProvider(constrFn) {
        var config = constrFn.$$annotationConfig;
        var injects = config.service.$inject || [];
        var inlineArrayAnnotation = injects.slice(1);
        inlineArrayAnnotation.push(function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            args.unshift(null, this);
            var instance = new (Function.prototype.bind.apply(config.service, args));
            return instance;
        });
        constrFn.prototype.$get = inlineArrayAnnotation;
        return _createInlineArrayAnnotation(constrFn);
    }
})(ngAnnotations || (ngAnnotations = {}));
