"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.terraformBlueprintsClient = exports.addressSuggestionsClient = exports.partnerClient = exports.templateVariablesClient = exports.emailTemplateClient = exports.notificationClient = exports.discussionClient = exports.emailSettingsClient = exports.messageClient = exports.automationClient = exports.permissionsClient = exports.workflowClient = exports.submissionClient = exports.organizationClient = exports.fileClient = exports.userClient = exports.pricingClient = exports.entityClient = exports.EpilotClient = void 0;
var auth_1 = require("@epilot/auth");
var address_suggestions_client_1 = __importStar(require("./address-suggestions-client"));
Object.defineProperty(exports, "addressSuggestionsClient", { enumerable: true, get: function () { return address_suggestions_client_1.default; } });
var automation_client_1 = __importStar(require("./automation-client"));
Object.defineProperty(exports, "automationClient", { enumerable: true, get: function () { return automation_client_1.default; } });
var discussion_client_1 = __importStar(require("./discussion-client"));
Object.defineProperty(exports, "discussionClient", { enumerable: true, get: function () { return discussion_client_1.default; } });
var email_settings_client_1 = __importStar(require("./email-settings-client"));
Object.defineProperty(exports, "emailSettingsClient", { enumerable: true, get: function () { return email_settings_client_1.default; } });
var email_template_client_1 = __importStar(require("./email-template-client"));
Object.defineProperty(exports, "emailTemplateClient", { enumerable: true, get: function () { return email_template_client_1.default; } });
var entity_client_1 = __importStar(require("./entity-client"));
Object.defineProperty(exports, "entityClient", { enumerable: true, get: function () { return entity_client_1.default; } });
var file_client_1 = __importStar(require("./file-client"));
Object.defineProperty(exports, "fileClient", { enumerable: true, get: function () { return file_client_1.default; } });
var message_client_1 = __importStar(require("./message-client"));
Object.defineProperty(exports, "messageClient", { enumerable: true, get: function () { return message_client_1.default; } });
var notification_client_1 = __importStar(require("./notification-client"));
Object.defineProperty(exports, "notificationClient", { enumerable: true, get: function () { return notification_client_1.default; } });
var organization_client_1 = __importStar(require("./organization-client"));
Object.defineProperty(exports, "organizationClient", { enumerable: true, get: function () { return organization_client_1.default; } });
var partner_directory_client_1 = __importStar(require("./partner-directory-client"));
Object.defineProperty(exports, "partnerClient", { enumerable: true, get: function () { return partner_directory_client_1.default; } });
var permissions_client_1 = __importStar(require("./permissions-client"));
Object.defineProperty(exports, "permissionsClient", { enumerable: true, get: function () { return permissions_client_1.default; } });
var pricing_client_1 = __importStar(require("./pricing-client"));
Object.defineProperty(exports, "pricingClient", { enumerable: true, get: function () { return pricing_client_1.default; } });
var submission_client_1 = __importStar(require("./submission-client"));
Object.defineProperty(exports, "submissionClient", { enumerable: true, get: function () { return submission_client_1.default; } });
var template_variables_client_1 = __importStar(require("./template-variables-client"));
Object.defineProperty(exports, "templateVariablesClient", { enumerable: true, get: function () { return template_variables_client_1.default; } });
var tf_blueprints_client_1 = __importStar(require("./tf-blueprints-client"));
Object.defineProperty(exports, "terraformBlueprintsClient", { enumerable: true, get: function () { return tf_blueprints_client_1.default; } });
var user_client_1 = __importStar(require("./user-client"));
Object.defineProperty(exports, "userClient", { enumerable: true, get: function () { return user_client_1.default; } });
var workflow_client_1 = __importStar(require("./workflow-client"));
Object.defineProperty(exports, "workflowClient", { enumerable: true, get: function () { return workflow_client_1.default; } });
var EpilotClient = /** @class */ (function () {
    function EpilotClient() {
    }
    Object.defineProperty(EpilotClient.prototype, "entity", {
        get: function () {
            return (0, entity_client_1.getClient)();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EpilotClient.prototype, "pricing", {
        get: function () {
            return (0, pricing_client_1.getClient)();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EpilotClient.prototype, "user", {
        get: function () {
            return (0, user_client_1.getClient)();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EpilotClient.prototype, "file", {
        get: function () {
            return (0, file_client_1.getClient)();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EpilotClient.prototype, "organization", {
        get: function () {
            return (0, organization_client_1.getClient)();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EpilotClient.prototype, "submission", {
        get: function () {
            return (0, submission_client_1.getClient)();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EpilotClient.prototype, "workflow", {
        get: function () {
            return (0, workflow_client_1.getClient)();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EpilotClient.prototype, "permissions", {
        get: function () {
            return (0, permissions_client_1.getClient)();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EpilotClient.prototype, "automation", {
        get: function () {
            return (0, automation_client_1.getClient)();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EpilotClient.prototype, "message", {
        get: function () {
            return (0, message_client_1.getClient)();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EpilotClient.prototype, "emailSettings", {
        get: function () {
            return (0, email_settings_client_1.getClient)();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EpilotClient.prototype, "discussion", {
        get: function () {
            return (0, discussion_client_1.getClient)();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EpilotClient.prototype, "notification", {
        get: function () {
            return (0, notification_client_1.getClient)();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EpilotClient.prototype, "emailTemplate", {
        get: function () {
            return (0, email_template_client_1.getClient)();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EpilotClient.prototype, "templateVariables", {
        get: function () {
            return (0, template_variables_client_1.getClient)();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EpilotClient.prototype, "partner", {
        get: function () {
            return (0, partner_directory_client_1.getClient)();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EpilotClient.prototype, "addressSuggestions", {
        get: function () {
            return (0, address_suggestions_client_1.getClient)();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EpilotClient.prototype, "terraformBlueprints", {
        get: function () {
            return (0, tf_blueprints_client_1.getClient)();
        },
        enumerable: false,
        configurable: true
    });
    EpilotClient.prototype.authorize = function (token) {
        (0, auth_1.authorizeWithToken)(this.entity, token);
        (0, auth_1.authorizeWithToken)(this.pricing, token);
        (0, auth_1.authorizeWithToken)(this.user, token);
        (0, auth_1.authorizeWithToken)(this.file, token);
        (0, auth_1.authorizeWithToken)(this.organization, token);
        (0, auth_1.authorizeWithToken)(this.submission, token);
        (0, auth_1.authorizeWithToken)(this.workflow, token);
        (0, auth_1.authorizeWithToken)(this.permissions, token);
        (0, auth_1.authorizeWithToken)(this.automation, token);
        (0, auth_1.authorizeWithToken)(this.message, token);
        (0, auth_1.authorizeWithToken)(this.emailSettings, token);
        (0, auth_1.authorizeWithToken)(this.discussion, token);
        (0, auth_1.authorizeWithToken)(this.notification, token);
        (0, auth_1.authorizeWithToken)(this.emailTemplate, token);
        (0, auth_1.authorizeWithToken)(this.templateVariables, token);
        (0, auth_1.authorizeWithToken)(this.partner, token);
        (0, auth_1.authorizeWithToken)(this.addressSuggestions, token);
        (0, auth_1.authorizeWithToken)(this.terraformBlueprints, token);
        return this;
    };
    EpilotClient.prototype.login = function (credentials) {
        return __awaiter(this, void 0, void 0, function () {
            var authorizer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, auth_1.authenticate)(credentials)];
                    case 1:
                        authorizer = _a.sent();
                        authorizer.configureClient(this.entity);
                        authorizer.configureClient(this.pricing);
                        authorizer.configureClient(this.user);
                        authorizer.configureClient(this.file);
                        authorizer.configureClient(this.organization);
                        authorizer.configureClient(this.submission);
                        authorizer.configureClient(this.workflow);
                        authorizer.configureClient(this.permissions);
                        authorizer.configureClient(this.automation);
                        authorizer.configureClient(this.message);
                        authorizer.configureClient(this.emailSettings);
                        authorizer.configureClient(this.discussion);
                        authorizer.configureClient(this.notification);
                        authorizer.configureClient(this.emailTemplate);
                        authorizer.configureClient(this.templateVariables);
                        authorizer.configureClient(this.partner);
                        authorizer.configureClient(this.addressSuggestions);
                        authorizer.configureClient(this.terraformBlueprints);
                        return [2 /*return*/, this];
                }
            });
        });
    };
    return EpilotClient;
}());
exports.EpilotClient = EpilotClient;
exports.default = EpilotClient;
//# sourceMappingURL=index.js.map