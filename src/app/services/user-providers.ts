import { UserService } from './user.service';
import { UserGuard } from './user-guard.service';

export var UserProviders=[
	UserGuard,
	UserService
]