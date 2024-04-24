using Invoeasy.BLL.CQRS.Commands.Customer;
using Invoeasy.BLL.CQRS.Events;
using Invoeasy.DAL.Context;
using Invoeasy.Definitions.BM;
using MediatR;

namespace Invoeasy.BLL.CQRS.Commands.Invoice
{
    public record CreateInvoiceCommand(InvoiceBM Model) : IRequest<bool>;

    internal class CreateInvoiceCommandHandler : IRequestHandler<CreateInvoiceCommand, bool>
    {
        private readonly IMediator mediator;
        private readonly InvoeasyDB ctx;

        public CreateInvoiceCommandHandler(IMediator mediator, InvoeasyDB ctx)
        {
            this.mediator = mediator;
            this.ctx = ctx;
        }

        public async Task<bool> Handle(CreateInvoiceCommand request, CancellationToken cancellationToken)
        {

            await ctx.Database.BeginTransactionAsync();

            var invoice = new Definitions.Models.Invoice();
            invoice.Id = Guid.NewGuid();
            invoice.Name = request.Model.Name;
            invoice.Number = request.Model.Number;

            invoice.Items = request.Model?.Items?.Select(i => new Definitions.Models.Item()
            {
                Name = i.Name,
                Price = i.Price,
                Quantity = i.Quantity,
            }).ToList();

            // if invoice customer has customer ID should use existing custoomer
            // if invoice customer does not have customer iD create new
            invoice.InvoiceCustomer = new Definitions.Models.InvoiceCustomer();
            invoice.InvoiceCustomer.Address = request.Model.InvoiceCustomer.Address;
            invoice.InvoiceCustomer.Name = request.Model.InvoiceCustomer.Name;

            if (request.Model.InvoiceCustomer?.CustomerId != null)
            {
                invoice.InvoiceCustomer.CustomerId = (Guid)request.Model.InvoiceCustomer.CustomerId;
            }
            else
            {
                // create new customer and map it to the invoice customer
                var customer = await mediator.Send(new CreateCustomerCommand(new CustomerBM() { Name = request.Model.InvoiceCustomer.Name, Address = request.Model.InvoiceCustomer.Address }));
                invoice.InvoiceCustomer.CustomerId = (Guid)customer.Id;
            }

            ctx.Add(invoice);


            await ctx.SaveChangesAsync();
            await ctx.Database.CommitTransactionAsync();

            await mediator.Publish(new InvoiceCreatedEventNotification(invoice.Id));

            return true;

        }
    }
}
