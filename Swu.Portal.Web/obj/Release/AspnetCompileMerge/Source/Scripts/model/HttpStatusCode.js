var Swu;
(function (Swu) {
    (function (HttpStatusCode) {
        HttpStatusCode[HttpStatusCode["Continue"] = 100] = "Continue";
        HttpStatusCode[HttpStatusCode["SwitchingProtocols"] = 101] = "SwitchingProtocols";
        HttpStatusCode[HttpStatusCode["OK"] = 200] = "OK";
        HttpStatusCode[HttpStatusCode["Created"] = 201] = "Created";
        HttpStatusCode[HttpStatusCode["Accepted"] = 202] = "Accepted";
        HttpStatusCode[HttpStatusCode["NonAuthoritativeInformation"] = 203] = "NonAuthoritativeInformation";
        HttpStatusCode[HttpStatusCode["NoContent"] = 204] = "NoContent";
        HttpStatusCode[HttpStatusCode["ResetContent"] = 205] = "ResetContent";
        HttpStatusCode[HttpStatusCode["PartialContent"] = 206] = "PartialContent";
        HttpStatusCode[HttpStatusCode["MultipleChoices"] = 300] = "MultipleChoices";
        HttpStatusCode[HttpStatusCode["Ambiguous"] = 300] = "Ambiguous";
        HttpStatusCode[HttpStatusCode["MovedPermanently"] = 301] = "MovedPermanently";
        HttpStatusCode[HttpStatusCode["Moved"] = 301] = "Moved";
        HttpStatusCode[HttpStatusCode["Found"] = 302] = "Found";
        HttpStatusCode[HttpStatusCode["Redirect"] = 302] = "Redirect";
        HttpStatusCode[HttpStatusCode["SeeOther"] = 303] = "SeeOther";
        HttpStatusCode[HttpStatusCode["RedirectMethod"] = 303] = "RedirectMethod";
        HttpStatusCode[HttpStatusCode["NotModified"] = 304] = "NotModified";
        HttpStatusCode[HttpStatusCode["UseProxy"] = 305] = "UseProxy";
        HttpStatusCode[HttpStatusCode["Unused"] = 306] = "Unused";
        HttpStatusCode[HttpStatusCode["RedirectKeepVerb"] = 307] = "RedirectKeepVerb";
        HttpStatusCode[HttpStatusCode["TemporaryRedirect"] = 307] = "TemporaryRedirect";
        HttpStatusCode[HttpStatusCode["BadRequest"] = 400] = "BadRequest";
        HttpStatusCode[HttpStatusCode["Unauthorized"] = 401] = "Unauthorized";
        HttpStatusCode[HttpStatusCode["PaymentRequired"] = 402] = "PaymentRequired";
        HttpStatusCode[HttpStatusCode["Forbidden"] = 403] = "Forbidden";
        HttpStatusCode[HttpStatusCode["NotFound"] = 404] = "NotFound";
        HttpStatusCode[HttpStatusCode["MethodNotAllowed"] = 405] = "MethodNotAllowed";
        HttpStatusCode[HttpStatusCode["NotAcceptable"] = 406] = "NotAcceptable";
        HttpStatusCode[HttpStatusCode["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
        HttpStatusCode[HttpStatusCode["RequestTimeout"] = 408] = "RequestTimeout";
        HttpStatusCode[HttpStatusCode["Conflict"] = 409] = "Conflict";
        HttpStatusCode[HttpStatusCode["Gone"] = 410] = "Gone";
        HttpStatusCode[HttpStatusCode["LengthRequired"] = 411] = "LengthRequired";
        HttpStatusCode[HttpStatusCode["PreconditionFailed"] = 412] = "PreconditionFailed";
        HttpStatusCode[HttpStatusCode["RequestEntityTooLarge"] = 413] = "RequestEntityTooLarge";
        HttpStatusCode[HttpStatusCode["RequestUriTooLong"] = 414] = "RequestUriTooLong";
        HttpStatusCode[HttpStatusCode["UnsupportedMediaType"] = 415] = "UnsupportedMediaType";
        HttpStatusCode[HttpStatusCode["RequestedRangeNotSatisfiable"] = 416] = "RequestedRangeNotSatisfiable";
        HttpStatusCode[HttpStatusCode["ExpectationFailed"] = 417] = "ExpectationFailed";
        HttpStatusCode[HttpStatusCode["UpgradeRequired"] = 426] = "UpgradeRequired";
        HttpStatusCode[HttpStatusCode["InternalServerError"] = 500] = "InternalServerError";
        HttpStatusCode[HttpStatusCode["NotImplemented"] = 501] = "NotImplemented";
        HttpStatusCode[HttpStatusCode["BadGateway"] = 502] = "BadGateway";
        HttpStatusCode[HttpStatusCode["ServiceUnavailable"] = 503] = "ServiceUnavailable";
        HttpStatusCode[HttpStatusCode["GatewayTimeout"] = 504] = "GatewayTimeout";
        HttpStatusCode[HttpStatusCode["HttpVersionNotSupported"] = 505] = "HttpVersionNotSupported";
    })(Swu.HttpStatusCode || (Swu.HttpStatusCode = {}));
    var HttpStatusCode = Swu.HttpStatusCode;
    (function (EmployeeType) {
        EmployeeType[EmployeeType["NotEmployee"] = 0] = "NotEmployee";
        EmployeeType[EmployeeType["Permanent"] = 1] = "Permanent";
        EmployeeType[EmployeeType["Guest"] = 2] = "Guest";
    })(Swu.EmployeeType || (Swu.EmployeeType = {}));
    var EmployeeType = Swu.EmployeeType;
})(Swu || (Swu = {}));