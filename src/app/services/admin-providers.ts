import { AdminService } from './admin.service';
import { AdminGuard } from './admin-guard.service';

export var AdminProviders=[
	AdminGuard,
	AdminService
]