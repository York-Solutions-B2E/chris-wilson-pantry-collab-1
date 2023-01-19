using server.Data;
using server.Models;
using server.Service.Token;

namespace server.Service.Roles
{
    public class RoleService : IRoleService
    {

        private readonly BackendServerContext _context;


        public RoleService(BackendServerContext context)
        {
            _context = context;
        }

        public List<Role> GetRolesByUserId(int id) {

            var query = from r in _context.Roles
                        join ur in _context.UserRoles on r.Id equals ur.RoleID
                        join u in _context.Users on ur.UserID equals u.Id
                        where u.Id == id
                        select r as Role; 

            List<Role> roles = query.ToList();

            if (roles.Count == 0)
            {
                //if no roles default to guest
                roles.Add(new Role { Name = "Guest"}); 
            }

            return roles; 
        }
    }
}
