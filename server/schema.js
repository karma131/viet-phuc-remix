const color={type:'string',pattern:'^#[0-9a-fA-F]{6}$'};
const lookProperties={
 patternEnabled:{type:'boolean'},avatar:{type:'integer',minimum:0,maximum:3},id:{type:'string'},name:{type:'string'},garmentId:{type:'string'},style:{type:'string'},occasion:{type:'string'},
 colors:{type:'object',additionalProperties:false,properties:{primary:color,secondary:color,accessory:color},required:['primary','secondary','accessory']},
 accessories:{type:'array',items:{type:'string'}},stylingReason:{type:'string'},culturalNote:{type:'string'},
 culturalStatus:{type:'string',enum:['appropriate','consider','not_recommended']},culturalWarning:{type:['string','null']},imagePrompt:{type:'string'}
};
export const jsonSchema={type:'object',additionalProperties:false,properties:{looks:{type:'array',minItems:3,maxItems:3,items:{type:'object',additionalProperties:false,properties:lookProperties,required:Object.keys(lookProperties)}}},required:['looks']};
