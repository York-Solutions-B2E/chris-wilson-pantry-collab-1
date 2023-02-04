﻿using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Bson;
using server.Data;
using server.Models;

namespace server.Service.PantryServices
{
    public class PantryServices : IPantryService
    {

        private readonly BackendServerContext _context;


        public PantryServices(BackendServerContext context)
        {
            _context = context;
        }

        //create
        public void AddItemToPantry(PantryItems pantryItems)
        {
            try
            {
                _context.PantryItems?.Add(pantryItems); 
                _context.SaveChanges();


            }
            catch (DbUpdateException ex)
            {
                //there was a error writing to the database
                throw new Exception(ex.Message, ex);

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        //read
        public List<PantryItems> GetPantryItems(int id)
        {
            var query = from p in _context.PantryItems
                        where p.FamilyId == id
                        select new PantryItems()
                        {
                            Id= p.Id,
                            FamilyId= p.FamilyId,
                            Ingredient = p.Ingredient,
                            Amount= p.Amount,
                            Expires= p.Expires
                        };
            List<PantryItems> pantries = query.ToList();

            return pantries; 
        }

        //update



        //delete


    }
}
