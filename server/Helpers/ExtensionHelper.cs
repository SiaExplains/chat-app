using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace WebApi.Helpers
{
    public static class ExtensionHelper
    {
        public static int? GetUserId(this ClaimsPrincipal principal)
        {
            if (principal == null)
            {
                return null;
            }
            var userId = principal.FindFirst("Name")?.Value;
            if (userId == null)
            {
                return null;
            }
            if (!int.TryParse(userId, out var id))
            {
                return null;
            }
            return id;
        }
    }
}
