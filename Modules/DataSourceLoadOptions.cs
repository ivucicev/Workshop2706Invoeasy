using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Data.Helpers;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Invoeasy.Modules
{
    public class DataSourceLoadOptionsBinderProvider : IModelBinderProvider
    {
        Microsoft.AspNetCore.Mvc.ModelBinding.IModelBinder IModelBinderProvider.GetBinder(ModelBinderProviderContext context)
        {
            if (context.Metadata.ModelType == typeof(DataSourceLoadOptions))
                return new DataSourceLoadOptions();
            return null;
        }
    }

    public class DataSourceLoadOptions : DataSourceLoadOptionsBase, Microsoft.AspNetCore.Mvc.ModelBinding.IModelBinder
    {
        public Task BindModelAsync(Microsoft.AspNetCore.Mvc.ModelBinding.ModelBindingContext bindingContext)
        {
            var loadOptions = new DataSourceLoadOptions();
            try
            {
                DataSourceLoadOptionsParser.Parse(loadOptions, key =>
                {
                    var value = bindingContext.ValueProvider.GetValue(key);
                    return value.ToString();
                });
                bindingContext.Model = loadOptions;
                bindingContext.Result = ModelBindingResult.Success(loadOptions);
                return Task.FromResult(true);
            }
            catch (System.Exception)
            {
                return Task.FromResult(false);
            }
        }
    }
}
